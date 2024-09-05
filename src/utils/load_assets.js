const getAssetURL = (image) => {
    return new URL(`/src/assets/img/${image}`, import.meta.url).href
}

export default getAssetURL

