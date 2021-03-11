import { Controller, Get, HttpCode, Query, Res, HttpException, HttpStatus, Post, UseGuards, UseInterceptors, UploadedFile, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { existsSync, createReadStream, createWriteStream, mkdirSync } from 'fs';
import { AuthGuard } from './guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as imageType from "image-type";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add-image')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async addPost(@UploadedFile() file, @Req() req) {
    return this.addImage(file);
  }
  async addImage(image) {
    let nameImage = ""
    if (!image) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    const type = imageType(image.buffer);
    if (!type) throw new HttpException('Unsupported Media Type SE', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    try {
      const directory = 'images/posts';
      const idImage = Date.now() + '_' + image.originalname;
      if (!existsSync('uploads/' + directory)) {
        mkdirSync(join('uploads/', directory), { recursive: true });
      }
      const path = join('uploads/' + directory, idImage);
      const fileWrite = createWriteStream(path);
      fileWrite.write(image.buffer);
      fileWrite.end();
      nameImage = directory + '/' + idImage;
    } catch (error) {
      throw new HttpException('Error undefine', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return nameImage;
  }

  @Get('image-download')
  @HttpCode(200)
  downloadImage(@Query('id') id: string, @Res() res) {
    const path = this.downloadFile(id);
    const fileName = path.split('/');
    let file = createReadStream(path);
    // res.header('Content-Disposition', `attachment; filename="${fileName[fileName.length-1]}"`);
    res.header('Content-Disposition', `filename="${fileName[fileName.length - 1]}"`);
    file.pipe(res);
    file.on('finish', () => file.close());
  }

  downloadFile(id: string): string {
    if (!id) throw new HttpException('Bat Request', HttpStatus.BAD_REQUEST);
    const path = join('uploads', id);
    const paths = path.split('/');

    if (!paths[0] || paths[0] !== 'uploads') throw new HttpException('Bat Request', HttpStatus.BAD_REQUEST);
    if (!existsSync(join(__dirname + '/../', path))) throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
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
