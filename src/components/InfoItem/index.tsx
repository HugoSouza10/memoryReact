import * as C from '../InfoItem/style';

type Props = {
    label:string,
    value:string,
}

export const InfoItem = ({label, value}:Props) =>{
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    )
}