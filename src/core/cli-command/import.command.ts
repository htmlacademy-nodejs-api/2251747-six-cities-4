import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from '../../const.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import OfferService from '../../modules/offer/offer.service.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { UserEntity, UserModel } from '../../modules/user/user.entity.js';
import UserService from '../../modules/user/user.service.js';
import { RentOffer } from '../../types/rent-offer.type.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage, getMongoURI } from '../helpers/index.js';
import ConsoleLoggerService from '../logger/console.service.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private logger:LoggerInterface;
  private userService!:UserServiceInterface;
  private offerService!:OfferServiceInterface;
  private databaseService!:DatabaseClientInterface;
  private salt!:string;

  constructor(){
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLoggerService();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer:RentOffer){
    const user: UserEntity = await this.userService.findOrCreate({...offer.user, password: DEFAULT_USER_PASSWORD}, this.salt);

    await this.offerService.create({...offer, publishDate: new Date(offer.publishDate), userId: user.id});
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
