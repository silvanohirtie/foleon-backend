import { PagesController } from "../pages/pages.controller";
import { PagesService } from "../pages/pages.service";
import { Test } from "@nestjs/testing";
import { CreatePageDto } from "../pages/pages.dto";

describe("PagesController", () => {
  let pagesController: PagesController;
  let pagesService: PagesService;

  const mockPagesService = {
    create: jest.fn((dto) => {
      return {
        id: 3,
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
      controllers: [PagesController],
      providers: [PagesService],
    })
      .overrideProvider(PagesService)
      .useValue(mockPagesService)
      .compile();

    pagesService = moduleRef.get<PagesService>(PagesService);
    pagesController = moduleRef.get<PagesController>(PagesController);
  });

  describe("Pages Controller Controller", () => {
    it("should create a page", () => {
      expect(
        pagesController.create({
          paragraph: "my page paragraph",
          title: "my page title",
          quote: "my page quote",
          image_id: 4,
        } as CreatePageDto)
      ).toEqual({
        id: expect.any(Number),
        paragraph: "my page paragraph",
        title: "my page title",
        quote: "my page quote",
        image_id: 4,
        created_at: "2022-10-29T18:08:15.418Z",
      });
    });

    it("should update a page image", () => {
      expect(
        pagesController.updateById(4, {
          image_id: 10,
        } as CreatePageDto)
      ).toEqual({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });
    });

    it("should delete a page", () => {
      expect(pagesController.deleteById(4)).toEqual({
        raw: [],
        affected: 1,
      });
    });
  });
});
