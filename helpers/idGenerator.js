import crypto from 'crypto';


export default function idGenerator(length) {
    return crypto
        .randomBytes(length)
        .toString('base64')
        .replace(/[^A-Za-z0-9]/gi, '')
        .slice(0, length+1);
}
