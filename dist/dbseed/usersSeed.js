"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeed = void 0;
const mongodb_1 = require("mongodb");
const bcrypt = require("bcryptjs");
const permissions_1 = require("./permissions");
const rolePermission_1 = require("./rolePermission");
async function main() {
    try {
        const dbName = process.env.DBNAME || 'rcv';
        const url = "mongodb://localhost";
        const client = new mongodb_1.MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
        const db = client.db(dbName);
        const users = [
            {
                username: 'superadmin',
                email: 'superadmin@gmail.com',
                idRole: 'SUPER_ADMIN',
                firstname: 'Super',
                lastname: 'Admin',
                password: await bcrypt.hashSync("123456789", 10)
            },
            {
                username: 'admin',
                email: 'admin@gmail.com',
                idRole: 'ADMIN',
                firstname: 'Admin',
                lastname: 'Smh',
                password: await bcrypt.hashSync("123456789", 10)
            },
            {
                username: 'client1',
                email: 'client1@gmail.com',
                idRole: 'CLIENT',
                firstname: 'Client1',
                lastname: 'Smh',
                password: await bcrypt.hashSync("123456789", 10)
            },
            {
                username: 'client2',
                email: 'client2@gmail.com',
                idRole: 'CLIENT',
                firstname: 'Client2',
                lastname: 'Smh',
                password: await bcrypt.hashSync("123456789", 10)
            },
            {
                username: 'client3',
                email: 'client3@gmail.com',
                idRole: 'CLIENT',
                firstname: 'Client3',
                lastname: 'Smh',
                password: await bcrypt.hashSync("123456789", 10)
            }
        ];
        try {
            const usersPromises = users.map(user => {
                const { username, email, idRole, firstname, lastname, password } = user;
                return db.collection('users').findOneAndUpdate({ username }, {
                    $set: {
                        username,
                        email,
                        idRole,
                        firstname,
                        lastname,
                        isActive: true,
                        isVerified: true,
                        isLocked: false,
                        password,
                        createdAt: +new Date()
                    }
                }, { upsert: true });
            });
            await Promise.all(usersPromises);
            console.log('🌱  Done for users');
        }
        catch (error) {
            console.log('❌  Error on users', error);
        }
        const roles = [
            {
                _id: 'SUPER_ADMIN',
                code: 'SUPER_ADMIN',
                name: 'SuperAdmin'
            },
            {
                _id: 'ADMIN',
                code: 'ADMIN',
                name: 'Admin'
            },
            {
                _id: 'CLIENT',
                code: 'CLIENT',
                name: 'CLIENT'
            }
        ];
        try {
            const rolesPromises = roles.map(role => {
                const { _id, code, name } = role;
                return db.collection('roles').findOneAndUpdate({ _id }, {
                    $setOnInsert: {
                        _id
                    },
                    $set: {
                        code,
                        name,
                        description: '',
                        isActive: true
                    }
                }, { upsert: true });
            });
            await Promise.all(rolesPromises);
            console.log('🌱  Done for roles');
        }
        catch (error) {
            console.log('❌  Error on roles', error);
        }
        try {
            const permissionsPromises = permissions_1.permissions.map(permission => {
                const { _id, code, name } = permission;
                return db.collection('permissions').findOneAndUpdate({ _id }, {
                    $setOnInsert: {
                        _id
                    },
                    $set: {
                        code,
                        name,
                        description: '',
                        isActive: true
                    }
                }, { upsert: true });
            });
            const permissionsDetailsPromises = permissions_1.detailPermission.map(permission => {
                const { _id, code, name } = permission;
                return db.collection('permissions').findOneAndUpdate({ _id }, {
                    $setOnInsert: {
                        _id
                    },
                    $set: {
                        code,
                        name,
                        description: '',
                        isActive: true
                    }
                }, { upsert: true });
            });
            await Promise.all(permissionsPromises.concat(permissionsDetailsPromises));
            console.log('🌱  Done for permissions');
        }
        catch (error) {
            console.log('❌  Error on permissions', error);
        }
        try {
            const rolePermissionPromises = [];
            for (const [role, permissionOfRoles] of Object.entries(rolePermission_1.rolePermissions)) {
                let permissionCodes = [];
                if (role === 'SUPER_ADMIN') {
                    permissionCodes = permissions_1.permissions.map(per => per.code);
                }
                else {
                    permissionCodes = permissionOfRoles;
                }
                permissionCodes.forEach(permissionCode => {
                    const foundRole = roles.find(rol => rol.code === role);
                    const foundPermission = permissions_1.permissions.find(per => per.code === permissionCode);
                    rolePermissionPromises.push(db.collection('roles_permissions').findOneAndUpdate({
                        '_id.idRole': foundRole._id,
                        '_id.idPermission': foundPermission._id
                    }, {
                        $set: {
                            isActive: true,
                            typeValue: 'none',
                            value: ''
                        }
                    }, { upsert: true }));
                });
            }
            await Promise.all(rolePermissionPromises);
            console.log('🌱  Done for roles_permissions');
        }
        catch (error) {
            console.log('❌  Error on roles_permissions', error);
        }
        client.close();
    }
    catch (err) {
        console.log(err);
    }
}
exports.userSeed = main;
//# sourceMappingURL=usersSeed.js.map