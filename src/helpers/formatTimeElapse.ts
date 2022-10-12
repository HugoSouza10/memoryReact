export const formatTimeElapse = (seconds:number) => {
    let minutes = Math.floor(seconds/60);
    let second = seconds - (minutes * 60);

    let secString = `${second <10? '0'+second: second}`;
    let minString = `${minutes <10? '0'+minutes: minutes}`;

    return `${minString}: ${secString}`;
}       