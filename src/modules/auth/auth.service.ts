import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const admin = await this.prisma.admin.findUnique({
        where: { email },
        });

        if (!admin) {
        throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
        }

        return admin;
    }

    // login session
    async login(email: string, password: string) {
        const admin = await this.validateUser(email, password);

        const payload = {
            sub: admin.id,
            email: admin.email,
            role: admin.role,
        };

        const now = new Date();

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: admin.id,
                email: admin.email,
                role: admin.role,
                lastLoginAt: now,
                lastLoginRelative: now.toISOString(),
            },
        };
    }

    // register session
    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.admin.create({
            data: {
                email,
                username: email,
                password: hashedPassword,
            },
        });
    }
}
