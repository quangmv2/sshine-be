import { MongoClient } from 'mongodb'
// import Bcrypt from 'bcrypt'
import * as bcrypt from 'bcryptjs';
import { permissions, detailPermission } from './permissions'
import { rolePermissions } from './rolePermission'
async function main() {
  try {
    // const url = process.env.MONGO_URL
    //   ? `mongodb://${process.env.MONGO_URL}`
    //   : `mongodb://localhost:${process.env.MONGO_PORT}`
    const dbName = process.env.DBNAME || 'rcv'
    const url = "mongodb://localhost"
    // MONGO_PORT=10049 DBNAME=cme yarn db:seed
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // *__TODO:
    await client.connect()
    const db = client.db(dbName)
    // const salt = require('bcrypt').genSaltSync(10)
    const users = [
      {
        // _id: 'ef0821e0-8c34-4419-9bfc-46d82c2a052f',
        username: 'superadmin',
        email: 'superadmin@gmail.com',
        idRole: 'SUPER_ADMIN',
        firstname: 'Super',
        lastname: 'Admin',
        password: await bcrypt.hashSync("123456789", 10)
      },
      {
        // _id: 'b1f18359-7ee4-4df1-bac2-c6b4f25babef',
        username: 'admin',
        email: 'admin@gmail.com',
        idRole: 'ADMIN',
        firstname: 'Admin',
        lastname: 'Smh',
        password: await bcrypt.hashSync("123456789", 10)
      },
      {
        // _id: 'db26df05-f60c-4202-837b-adb24b78c016',
        username: 'client1',
        email: 'client1@gmail.com',
        idRole: 'CLIENT',
        firstname: 'Client1',
        lastname: 'Smh',
        password: await bcrypt.hashSync("123456789", 10)
      },
      {
        // _id: 'f57b1f78-f9a1-49dd-b294-a938eebb7bdc',
        username: 'client2',
        email: 'client2@gmail.com',
        idRole: 'CLIENT',
        firstname: 'Client2',
        lastname: 'Smh',
        password: await bcrypt.hashSync("123456789", 10)
      },
      {
        // _id: 'b8424c26-ca91-4b47-a759-fcbc40e808dc',
        username: 'client3',
        email: 'client3@gmail.com',
        idRole: 'CLIENT',
        firstname: 'Client3',
        lastname: 'Smh',
        password: await bcrypt.hashSync("123456789", 10)
      }
    ]
    try {
      const usersPromises = users.map(user => {
        const {
          // _id,
          username,
          email,
          idRole,
          firstname,
          lastname,
          password
        } = user
        return db.collection('users').findOneAndUpdate(
          { username },
          {
            // $setOnInsert: {
            //   _id
            // },
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
          },
          { upsert: true }
        )
      })
      await Promise.all(usersPromises)
      console.log('🌱  Done for users')
    } catch (error) {
      console.log('❌  Error on users', error)
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
    ]
    try {
      const rolesPromises = roles.map(role => {
        const { _id, code, name } = role
        return db.collection('roles').findOneAndUpdate(
          { _id },
          {
            $setOnInsert: {
              _id
            },
            $set: {
              code,
              name,
              description: '',
              isActive: true
            }
          },
          { upsert: true }
        )
      })
      await Promise.all(rolesPromises)
      console.log('🌱  Done for roles')
    } catch (error) {
      console.log('❌  Error on roles', error)
    }

    try {
      const permissionsPromises = permissions.map(permission => {
        const { _id, code, name } = permission
        return db.collection('permissions').findOneAndUpdate(
          { _id },
          {
            $setOnInsert: {
              _id
            },
            $set: {
              code,
              name,
              description: '',
              isActive: true
            }
          },
          { upsert: true }
        )
      })
      const permissionsDetailsPromises = detailPermission.map(permission => {
        const { _id, code, name } = permission
        return db.collection('permissions').findOneAndUpdate(
          { _id },
          {
            $setOnInsert: {
              _id
            },
            $set: {
              code,
              name,
              description: '',
              isActive: true
            }
          },
          { upsert: true }
        )
      })
      await Promise.all(permissionsPromises.concat(permissionsDetailsPromises))
      console.log('🌱  Done for permissions')
    } catch (error) {
      console.log('❌  Error on permissions', error)
    }

    try {
      const rolePermissionPromises = []
      for (const [role, permissionOfRoles] of Object.entries(rolePermissions)) {
        let permissionCodes = []
        if (role === 'SUPER_ADMIN') {
          permissionCodes = permissions.map(per => per.code)
        } else {
          permissionCodes = permissionOfRoles
        }
        permissionCodes.forEach(permissionCode => {
          const foundRole = roles.find(rol => rol.code === role)
          const foundPermission = permissions.find(
            per => per.code === permissionCode
          )
          rolePermissionPromises.push(
            db.collection('roles_permissions').findOneAndUpdate(
              {
                '_id.idRole': foundRole._id,
                '_id.idPermission': foundPermission._id
              },
              {
                // $setOnInsert: {
                //   _id: {
                //     roleId: foundRole._id,
                //     permissionId: foundPermission._id
                //   }
                // },
                $set: {
                  isActive: true,
                  typeValue: 'none',
                  value: ''
                }
              },
              { upsert: true }
            )
          )
        })
      }
      await Promise.all(rolePermissionPromises)
      console.log('🌱  Done for roles_permissions')
    } catch (error) {
      console.log('❌  Error on roles_permissions', error)
    }
    client.close()
  } catch (err) {
    console.log(err)
  }
}
export { main as userSeed }
