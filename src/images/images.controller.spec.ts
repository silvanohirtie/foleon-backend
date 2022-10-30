import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { Test } from "@nestjs/testing";
import { CreateImageDto } from "./images.dto";

describe("ImagesController", () => {
  let imagesController: ImagesController;
  let imagesService: ImagesService;

  const mockImagesService = {
    create: jest.fn((dto) => {
      return {
        id: 10,
        created_at: "2022-10-29T18:08:15.418Z",
        ...dto,
      };
    }),
    updateById: jest.fn(() => {
      return {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
    }),
    deleteById: jest.fn(() => {
      return {
        raw: [],
        affected: 1,
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    })
      .overrideProvider(ImagesService)
      .useValue(mockImagesService)
      .compile();

    imagesService = moduleRef.get<ImagesService>(ImagesService);
    imagesController = moduleRef.get<ImagesController>(ImagesController);
  });

  describe("Imges Controller", () => {
    it("should create an image", () => {
      expect(
        imagesController.create({
          url: "https://fantastic-pictures.com/dog.png",
          name: "Testing Image",
        } as CreateImageDto)
      ).toEqual({
        id: expect.any(Number),
        name: "Testing Image",
        url: "https://fantastic-pictures.com/dog.png",
        created_at: "2022-10-29T18:08:15.418Z",
      });
    });

    it("should update an image", () => {
      expect(
        imagesController.updateById(1, {
          url: "https://fantastic-pictures.com/dog.png",
          name: "Testing Image2",
        } as CreateImageDto)
      ).toEqual({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });
    });

    it("should delete an image", () => {
      expect(imagesController.deleteById(1)).toEqual({
        raw: [],
        affected: 1,
      });
    });
  });
});
