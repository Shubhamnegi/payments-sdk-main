import sha1 from 'sha1'

export const hash = (value: string) => {
    return sha1(value)
}