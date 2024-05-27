import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { ILoginAuthUseCase } from "../interfaces/login-auth.interface";
import { ApiCreatedResponse } from "src/config/swagger/swagger.decorators";
import { LoginDto } from "../dto/login-dto";


describe('AuthController', () => {
  let controller: AuthController;
  let login: ILoginAuthUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: ILoginAuthUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    login = module.get<ILoginAuthUseCase>(ILoginAuthUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call loginAuthUseCase.execute with the provided dto', () => {
      ApiCreatedResponse('Created');
      const dto = {} as LoginDto;
      const executeSpy = jest.spyOn(login, 'execute');
      controller.create(dto);
      expect(executeSpy).toHaveBeenCalledWith(dto);
    });
  });
});
9;
