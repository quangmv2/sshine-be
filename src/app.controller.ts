import { Controller, Get, HttpCode, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { existsSync, createReadStream, createWriteStream } from 'fs';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('image-download')
  @HttpCode(200)
  downloadImage(@Query('id') id: string, @Res() res) {
    const path = this.downloadFile(id);
    const fileName = path.split('/');
    let file = createReadStream(path);
    // res.header('Content-Disposition', `attachment; filename="${fileName[fileName.length-1]}"`);
    res.header('Content-Disposition', `filename="${fileName[fileName.length-1]}"`);
    file.pipe(res);
    file.on('finish', () => file.close());
  }

  downloadFile(id: string): string {
    if (!id) throw new HttpException('Bat Request', HttpStatus.BAD_REQUEST);
    const path = join('uploads', id);
    const paths = path.split('/');
    
    if (!paths[0] || paths[0] !== 'uploads') throw new HttpException('Bat Request', HttpStatus.BAD_REQUEST); 
    if (!existsSync(join(__dirname+'/../', path))) throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    return path;
  } 

  @Get('file')
  async file(@Res() res) {
    let file = createReadStream('uploads/DRL.zip');
    res.header('Content-Disposition', `filename="DRL.zip"`);
    file.pipe(res);
    file.on('finish', () => file.close());
  }

  @Get('mothaibabon')
  async file1(@Res() res) {
    let file = createReadStream('uploads/cnpm.txt');
    res.header('Content-Disposition', `filename="DRL.txt"`);
    file.pipe(res);
    file.on('finish', () => file.close());
  }

  @Get('mothaibabonnam')
  async file2(@Res() res) {
    let file = createReadStream('uploads/combinepdf.pdf');
    res.header('Content-Disposition', `filename="combinepdf.pdf"`);
    file.pipe(res);
    file.on('finish', () => file.close());
  }

}
