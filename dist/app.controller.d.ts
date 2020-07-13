import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    downloadImage(id: string, res: any): void;
    downloadFile(id: string): string;
    file(res: any): Promise<void>;
    file1(res: any): Promise<void>;
    file2(res: any): Promise<void>;
}
