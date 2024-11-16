import 'reflect-metadata'
import { Ancestry } from './Ancestry';



export function ignoreFilter(target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata('ignoreFilter', true, target, propertyKey);
}

export function showInTrait(target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata('showInTrait', true, target, propertyKey);
}

export function EmitMetadata(target: Function) {}