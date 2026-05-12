import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AffibotApi implements ICredentialType {
	name = 'affibotApi';
	displayName = 'Affibot API';
	documentationUrl = 'https://bot.affidev.com';
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			description: 'The API Key for Affibot',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://bot.affidev.com',
			required: true,
			description: 'The base URL for the Affibot API',
		},
	];
}
