import { base_model } from './base_model';
import { basename } from 'path';

export interface ITag extends base_model {
    title: string;
    description?: string;
    is_primary?: boolean;
    icon?: string;
}