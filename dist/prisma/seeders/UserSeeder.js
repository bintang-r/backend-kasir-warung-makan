"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const faker_1 = require("@faker-js/faker");
async function seedUsers(prisma) {
    const password = await bcrypt.hash('password123', 10);
    const roles = [client_1.Role.ADMIN, client_1.Role.KASIR, client_1.Role.KITCHEN, client_1.Role.DRIVER];
    for (const role of roles) {
        for (let i = 1; i <= 3; i++) {
            const email = `${role.toLowerCase()}${i}@rmsiantar.com`;
            await prisma.user.create({
                data: {
                    email,
                    password,
                    name: `${role.charAt(0) + role.slice(1).toLowerCase()} Staff ${i}`,
                    role,
                }
            });
        }
    }
    for (let i = 1; i <= 10; i++) {
        await prisma.user.create({
            data: {
                email: faker_1.faker.internet.email().toLowerCase(),
                password,
                name: faker_1.faker.person.fullName(),
                role: client_1.Role.CUSTOMER
            }
        });
    }
    console.log('✅ Staff and Basic Customers seeded');
}
//# sourceMappingURL=UserSeeder.js.map