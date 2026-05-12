import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Affibot implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Affibot',
		name: 'affibot',
		icon: 'file:affibot.png',
		group: ['transform'],
		version: 1,
		description: 'Send messages and manage WhatsApp via Affibot',
		defaults: {
			name: 'Affibot',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'affibotApi',
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
						name: 'Profile',
						value: 'profile',
					},
				],
				default: 'message',
			},
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
						action: 'Send a text message',
					},
					{
						name: 'Send Image',
						value: 'sendImage',
						action: 'Send an image',
					},
					{
						name: 'Send Document',
						value: 'sendDocument',
						action: 'Send a document',
					},
					{
						name: 'Send Video',
						value: 'sendVideo',
						action: 'Send a video',
					},
					{
						name: 'Send Sticker',
						value: 'sendSticker',
						action: 'Send a sticker',
					},
					{
						name: 'Send Bulk',
						value: 'sendBulk',
						action: 'Send bulk messages',
					},
				],
				default: 'sendText',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['profile'],
					},
				},
				options: [
					{
						name: 'Check Number',
						value: 'checkNumber',
						action: 'Check if a number is on WhatsApp',
					},
				],
				default: 'checkNumber',
			},

			// Shared Parameters
			{
				displayName: 'Session ID',
				name: 'session',
				type: 'string',
				required: true,
				default: '',
				description: 'The session ID of the device',
			},

			// Message Parameters
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText', 'sendImage', 'sendDocument', 'sendVideo', 'sendSticker'],
					},
				},
				description: 'The recipient JID (e.g. 628xxx@s.whatsapp.net)',
			},
			{
				displayName: 'Message',
				name: 'text',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText', 'sendImage', 'sendDocument', 'sendVideo', 'sendBulk'],
					},
				},
				description: 'The text message or caption',
			},

			// Image/Sticker Parameters
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendImage', 'sendSticker'],
					},
				},
				description: 'URL of the image',
			},

			// Document Parameters
			{
				displayName: 'Document URL',
				name: 'documentUrl',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendDocument'],
					},
				},
				description: 'URL of the document',
			},
			{
				displayName: 'Document Name',
				name: 'documentName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendDocument'],
					},
				},
				description: 'Name of the document (e.g. report.pdf)',
			},

			// Video Parameters
			{
				displayName: 'Video URL',
				name: 'videoUrl',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendVideo'],
					},
				},
				description: 'URL of the video',
			},

			// Bulk Parameters
			{
				displayName: 'Numbers',
				name: 'numbers',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendBulk'],
					},
				},
				description: 'Comma-separated list of JIDs',
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendBulk'],
					},
				},
				description: 'URL of the media (if type is not text)',
			},

			// Profile Parameters
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['checkNumber'],
					},
				},
				description: 'The phone number JID to check',
			},

			// Optional Parameters
			{
				displayName: 'Is Group',
				name: 'isGroup',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText', 'sendImage', 'sendDocument', 'sendVideo', 'sendSticker', 'sendBulk'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('affibotApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let body: any = {
					session: this.getNodeParameter('session', i) as string,
				};

				let endpoint = '';

				if (resource === 'message') {
					if (operation === 'sendText') {
						endpoint = '/message/send-text';
						body.to = this.getNodeParameter('to', i) as string;
						body.text = this.getNodeParameter('text', i) as string;
						body.is_group = this.getNodeParameter('isGroup', i) as boolean;
					} else if (operation === 'sendImage') {
						endpoint = '/message/send-image';
						body.to = this.getNodeParameter('to', i) as string;
						body.text = this.getNodeParameter('text', i) as string;
						body.image_url = this.getNodeParameter('imageUrl', i) as string;
						body.is_group = this.getNodeParameter('isGroup', i) as boolean;
					} else if (operation === 'sendDocument') {
						endpoint = '/message/send-document';
						body.to = this.getNodeParameter('to', i) as string;
						body.text = this.getNodeParameter('text', i) as string;
						body.document_url = this.getNodeParameter('documentUrl', i) as string;
						body.document_name = this.getNodeParameter('documentName', i) as string;
						body.is_group = this.getNodeParameter('isGroup', i) as boolean;
					} else if (operation === 'sendVideo') {
						endpoint = '/message/send-video';
						body.to = this.getNodeParameter('to', i) as string;
						body.text = this.getNodeParameter('text', i) as string;
						body.video_url = this.getNodeParameter('videoUrl', i) as string;
						body.is_group = this.getNodeParameter('isGroup', i) as boolean;
					} else if (operation === 'sendSticker') {
						endpoint = '/message/send-sticker';
						body.to = this.getNodeParameter('to', i) as string;
						body.image_url = this.getNodeParameter('imageUrl', i) as string;
						body.is_group = this.getNodeParameter('isGroup', i) as boolean;
					} else if (operation === 'sendBulk') {
						endpoint = '/message/send-bulk';
						const numbersStr = this.getNodeParameter('numbers', i) as string;
						body.numbers = numbersStr.split(',').map(n => n.trim());
						body.text = this.getNodeParameter('text', i) as string;
						body.media_url = this.getNodeParameter('mediaUrl', i) as string;
						body.is_group = this.getNodeParameter('isGroup', i) as boolean;
					}
				} else if (resource === 'profile') {
					if (operation === 'checkNumber') {
						endpoint = '/profile/check';
						body.phone = this.getNodeParameter('phone', i) as string;
					}
				}

				const response = await this.helpers.requestWithAuthentication.call(this, 'affibotApi', {
					method: 'POST',
					uri: `${credentials.baseUrl}${endpoint}`,
					body,
					json: true,
				});

				returnData.push({ json: response });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as any).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
