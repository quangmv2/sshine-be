"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const path_1 = require("path");
const fs_1 = require("fs");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    downloadImage(id, res) {
        const path = this.downloadFile(id);
        const fileName = path.split('/');
        let file = fs_1.createReadStream(path);
        res.header('Content-Disposition', `filename="${fileName[fileName.length - 1]}"`);
        file.pipe(res);
        file.on('finish', () => file.close());
    }
    downloadFile(id) {
        if (!id)
            throw new common_1.HttpException('Bat Request', common_1.HttpStatus.BAD_REQUEST);
        const path = path_1.join('uploads', id);
        const paths = path.split('/');
        if (!paths[0] || paths[0] !== 'uploads')
            throw new common_1.HttpException('Bat Request', common_1.HttpStatus.BAD_REQUEST);
        if (!fs_1.existsSync(path_1.join(__dirname + '/../', path)))
            throw new common_1.HttpException('FORBIDDEN', common_1.HttpStatus.FORBIDDEN);
        return path;
    }
    async file(res) {
        let file = fs_1.createReadStream('uploads/DRL.zip');
        res.header('Content-Disposition', `filename="DRL.zip"`);
        file.pipe(res);
        file.on('finish', () => file.close());
    }
    async file1(res) {
        let file = fs_1.createReadStream('uploads/cnpm.txt');
        res.header('Content-Disposition', `filename="DRL.txt"`);
        file.pipe(res);
        file.on('finish', () => file.close());
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('image-download'),
    common_1.HttpCode(200),
    __param(0, common_1.Query('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "downloadImage", null);
__decorate([
    common_1.Get('file'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "file", null);
__decorate([
    common_1.Get('mothaibabon'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "file1", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map