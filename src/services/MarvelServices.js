class MarvelService {
_apiBase = 'https://gateway.marvel.com:443/v1/public/';//Оптимизируем ссылки, так как мы часто будем их использовать и код часто повторяется, легче повторяющиеся куски кода вынести, но ссылки тогда будут динамическими и нужно использовать ``
_apiKey = 'apikey=ea2364b682f4916e26a6de922b3ca993'


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not feth ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {//Получаем сразу всех персонажей, в ссылке, указанной ниже можно изменять некоторые параметры, к примеру такие, как количество показываемых карточек и лимит
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);//Пример оптимизации кода
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {//Получаем одного персонажа
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=ea2364b682f4916e26a6de922b3ca993`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {//Перекинули метод сюда, так как он будет много где применяться
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;