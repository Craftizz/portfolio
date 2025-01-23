import crypto from 'crypto';

export function generateSeed(): number {
    return parseInt(crypto.randomBytes(4).toString('hex'), 16);
}