import {
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class AffibotTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Affibot Trigger',
		name: 'affibotTrigger',
		icon: 'file:affibot.png',
		group: ['trigger'],
		version: 1,
		description: 'Handle WhatsApp events via Affibot webhooks',
		defaults: {
			name: 'Affibot Trigger',
		},
		inputs: [],
		outputs: ['main'],
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
						name: 'Message',
						value: 'message',
						description: 'Trigger on incoming messages',
					},
					{
						name: 'Session',
						value: 'session',
						description: 'Trigger on session status changes',
					},
				],
				default: ['message'],
				required: true,
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		const events = this.getNodeParameter('events', []) as string[];

		const event = body.event as string;

		if (events.includes(event)) {
			return {
				workflowData: [
					this.helpers.returnJsonArray(body),
				],
			};
		}

		return {};
	}
}
