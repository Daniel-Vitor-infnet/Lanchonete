import { InterfaceFoodPropVersion } from '@/types/index';


interface InterfaceFoodVersionFunctionProps {
    data: InterfaceFoodPropVersion;
    yes: any;
    no: any;
}

export const foodVersionCheck = (({ data, yes, no }: InterfaceFoodVersionFunctionProps) => {
    return !!data.version ? yes : no
})