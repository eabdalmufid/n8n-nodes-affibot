import { Affibot } from './nodes/Affibot/Affibot.node';
import { AffibotTrigger } from './nodes/Affibot/AffibotTrigger.node';
import { AffibotApi } from './credentials/AffibotApi.credentials';

export const nodes = [
	Affibot,
	AffibotTrigger,
];

export const credentials = [
	AffibotApi,
];
