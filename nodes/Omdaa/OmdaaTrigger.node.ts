import {
  IWebhookFunctions,
  IWebhookResponseData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
  NodeOperationError,
} from 'n8n-workflow';

import * as crypto from 'crypto';

export class OmdaaTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Omdaa Trigger',
    name: 'omdaaTrigger',
    icon: 'file:omdaa.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["event"]}}',
    description: 'Listen to Omdaa WhatsApp API webhook events',
    defaults: {
      name: 'Omdaa Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'omdaaApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        options: [
          {
            name: 'Message Received',
            value: 'message.received',
            description: 'Triggers when a new message is received',
          },
          {
            name: 'Session Status',
            value: 'session.status',
            description: 'Triggers when session status changes',
          },
          {
            name: 'QR Generated',
            value: 'qr.generated',
            description: 'Triggers when a QR code is generated',
          },
          {
            name: 'Test',
            value: 'test',
            description: 'Triggers on webhook test',
          },
          {
            name: 'All Events',
            value: '*',
            description: 'Triggers on all events',
          },
        ],
        default: ['message.received'],
        description: 'The events to listen to',
      },
      {
        displayName: 'Verify Signature',
        name: 'verifySignature',
        type: 'boolean',
        default: true,
        description: 'Whether to verify the webhook signature from X-Omdaa-Signature header',
      },
      {
        displayName: 'Webhook Secret',
        name: 'webhookSecret',
        type: 'string',
        displayOptions: {
          show: {
            verifySignature: [true],
          },
        },
        typeOptions: {
          password: true,
        },
        default: '',
        description: 'The webhook secret configured in Omdaa Dashboard',
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const bodyData = this.getBodyData() as IDataObject;
    const headerData = this.getHeaderData() as IDataObject;
    const events = this.getNodeParameter('events', []) as string[];
    const verifySignature = this.getNodeParameter('verifySignature', false) as boolean;

    // Extract webhook payload
    const webhookPayload = {
      event: bodyData.event as string,
      timestamp: bodyData.timestamp as string,
      data: bodyData.data as IDataObject,
      user: bodyData.user as IDataObject,
    };

    // Verify event type
    if (!webhookPayload.event) {
      throw new NodeOperationError(this.getNode(), 'Webhook payload missing event field');
    }

    // Check if event should be processed
    const shouldProcess = events.includes('*') || events.includes(webhookPayload.event);
    
    if (!shouldProcess) {
      // Event not subscribed, return 200 but don't trigger workflow
      return {
        workflowData: [[]],
      };
    }

    // Verify signature if enabled
    if (verifySignature) {
      const webhookSecret = this.getNodeParameter('webhookSecret', '') as string;
      
      if (!webhookSecret) {
        throw new NodeOperationError(
          this.getNode(),
          'Webhook secret is required when signature verification is enabled',
        );
      }

      const signature = headerData['x-omdaa-signature'] as string;
      
      if (!signature) {
        throw new NodeOperationError(
          this.getNode(),
          'Webhook signature missing in X-Omdaa-Signature header',
        );
      }

      // Verify HMAC signature
      const isValid = this.verifyWebhookSignature(bodyData, signature, webhookSecret);
      
      if (!isValid) {
        throw new NodeOperationError(this.getNode(), 'Invalid webhook signature');
      }
    }

    // Return the webhook data
    return {
      workflowData: [
        [
          {
            json: {
              event: webhookPayload.event,
              timestamp: webhookPayload.timestamp,
              data: webhookPayload.data,
              user: webhookPayload.user,
              // Additional metadata
              headers: headerData,
              receivedAt: new Date().toISOString(),
            },
          },
        ],
      ],
    };
  }

  /**
   * Verify webhook signature using HMAC-SHA256
   */
  private verifyWebhookSignature(
    payload: IDataObject,
    signature: string,
    secret: string,
  ): boolean {
    try {
      // Create HMAC signature
      const hmac = crypto.createHmac('sha256', secret);
      const payloadString = JSON.stringify(payload);
      hmac.update(payloadString);
      const calculatedSignature = hmac.digest('hex');

      // Compare signatures
      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(calculatedSignature),
      );
    } catch (error) {
      return false;
    }
  }
}
