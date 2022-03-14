const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data
    });
    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`У тебя ошибка в фетч ${url} со статусом ${res.status}`);
    }

    return await res.json();
}


export {postData};
export {getResource};