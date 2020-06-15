import { Injectable } from '@nestjs/common';
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {

    private readonly CLIENT_ID = process.env.CLIENT_ID || "";
    private client = new OAuth2Client(this.CLIENT_ID);

    async verifyGoogleToken(idToken: string) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: this.CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
        } catch (error) {
            
        }
    }

}
