import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EntrepriseModule } from './modules/entreprise/entreprise.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { DemandesModule } from './modules/demandes/demandes.module';
import { PatientsModule } from './modules/patients/patients.module';
import { CalendrierModule } from './modules/calendrier/calendrier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT) || 3306,
    //   username: process.env.DB_USERNAME || 'root',
    //   password: process.env.DB_PASSWORD || '',
    //   database: process.env.DB_DATABASE || 'careway',
    //   autoLoadEntities: true,
    //   synchronize: process.env.NODE_ENV !== 'production',
    // }),
    AuthModule,
    UsersModule,
    EntrepriseModule,
    TransactionsModule,
    DemandesModule,
    PatientsModule,
    CalendrierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}