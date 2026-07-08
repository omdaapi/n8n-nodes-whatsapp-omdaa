import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
  NodeOperationError,
} from 'n8n-workflow';

export class Omdaa implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Omdaa',
    name: 'omdaa',
    icon: 'file:omdaa.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Omdaa WhatsApp API',
    defaults: {
      name: 'Omdaa',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'omdaaApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Message',
            value: 'message',
          },
          {
            name: 'Session',
            value: 'session',
          },
        ],
        default: 'message',
      },
      // Message Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['message'],
          },
        },
        options: [
          {
            name: 'Send Text',
            value: 'sendText',
            description: 'Send a text message',
            action: 'Send a text message',
          },
          {
            name: 'Send Image',
            value: 'sendImage',
            description: 'Send an image',
            action: 'Send an image',
          },
          {
            name: 'Send File',
            value: 'sendFile',
            description: 'Send a file',
            action: 'Send a file',
          },
        ],
        default: 'sendText',
      },
      // Session Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['session'],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            description: 'Create a new session',
            action: 'Create a new session',
          },
          {
            name: 'Get Status',
            value: 'getStatus',
            description: 'Get session status',
            action: 'Get session status',
          },
          {
            name: 'Logout',
            value: 'logout',
            description: 'Logout session',
            action: 'Logout session',
          },
        ],
        default: 'create',
      },
      // Send Text Parameters
      {
        displayName: 'Session ID',
        name: 'sessionId',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendText', 'sendImage', 'sendFile'],
          },
        },
        default: '',
        description: 'The session ID to send message from',
      },
      {
        displayName: 'Phone Number',
        name: 'phoneNumber',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendText', 'sendImage', 'sendFile'],
          },
        },
        default: '',
        placeholder: '966xxxxxxxxx',
        description: 'Phone number with country code (without +)',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendText'],
          },
        },
        default: '',
        description: 'The text message to send',
      },
      {
        displayName: 'Image URL',
        name: 'imageUrl',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendImage'],
          },
        },
        default: '',
        description: 'URL of the image to send',
      },
      {
        displayName: 'Caption',
        name: 'caption',
        type: 'string',
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendImage'],
          },
        },
        default: '',
        description: 'Optional caption for the image',
      },
      {
        displayName: 'File URL',
        name: 'fileUrl',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendFile'],
          },
        },
        default: '',
        description: 'URL of the file to send',
      },
      {
        displayName: 'Filename',
        name: 'filename',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['message'],
            operation: ['sendFile'],
          },
        },
        default: '',
        description: 'Name of the file',
      },
      // Session Parameters
      {
        displayName: 'Session Name',
        name: 'sessionName',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['session'],
            operation: ['create'],
          },
        },
        default: '',
        description: 'Name for the new session',
      },
      {
        displayName: 'Session ID',
        name: 'sessionId',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['session'],
            operation: ['getStatus', 'logout'],
          },
        },
        default: '',
        description: 'The session ID',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0);
    const operation = this.getNodeParameter('operation', 0);

    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === 'message') {
          if (operation === 'sendText') {
            const sessionId = this.getNodeParameter('sessionId', i) as string;
            const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
            const message = this.getNodeParameter('message', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
              this,
              'omdaaApi',
              {
                method: 'POST',
                url: '/messages/send-text',
                body: {
                  sessionId,
                  to: phoneNumber,
                  message,
                },
                json: true,
              },
            );

            returnData.push({ json: response });
          } else if (operation === 'sendImage') {
            const sessionId = this.getNodeParameter('sessionId', i) as string;
            const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
            const imageUrl = this.getNodeParameter('imageUrl', i) as string;
            const caption = this.getNodeParameter('caption', i, '') as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
              this,
              'omdaaApi',
              {
                method: 'POST',
                url: '/messages/send-image',
                body: {
                  sessionId,
                  to: phoneNumber,
                  imageUrl,
                  caption,
                },
                json: true,
              },
            );

            returnData.push({ json: response });
          } else if (operation === 'sendFile') {
            const sessionId = this.getNodeParameter('sessionId', i) as string;
            const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
            const fileUrl = this.getNodeParameter('fileUrl', i) as string;
            const filename = this.getNodeParameter('filename', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
              this,
              'omdaaApi',
              {
                method: 'POST',
                url: '/messages/send-file',
                body: {
                  sessionId,
                  to: phoneNumber,
                  fileUrl,
                  filename,
                },
                json: true,
              },
            );

            returnData.push({ json: response });
          }
        } else if (resource === 'session') {
          if (operation === 'create') {
            const sessionName = this.getNodeParameter('sessionName', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
              this,
              'omdaaApi',
              {
                method: 'POST',
                url: '/sessions/create',
                body: {
                  sessionName,
                },
                json: true,
              },
            );

            returnData.push({ json: response });
          } else if (operation === 'getStatus') {
            const sessionId = this.getNodeParameter('sessionId', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
              this,
              'omdaaApi',
              {
                method: 'GET',
                url: `/sessions/status?sessionId=${sessionId}`,
                json: true,
              },
            );

            returnData.push({ json: response });
          } else if (operation === 'logout') {
            const sessionId = this.getNodeParameter('sessionId', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
              this,
              'omdaaApi',
              {
                method: 'DELETE',
                url: `/sessions/logout?sessionId=${sessionId}`,
                json: true,
              },
            );

            returnData.push({ json: response });
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error instanceof Error ? error.message : String(error) } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
