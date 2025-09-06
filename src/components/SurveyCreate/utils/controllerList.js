import ShortTextController from "../../../controller/ShortTextController";
import LongTextController from "../../../controller/LongTextController";
import WelcomeTextController from "../../../controller/WelcomeTextController";
import FinishTextController from "../../../controller/FinishTextController";
import MultipleChoiceController from "../../../controller/MultipleChoiceController";
import DropdownController from "../../../controller/DropdownController";
import EmailController from "../../../controller/EmailController";
import RatingController from "../../../controller/RatingController";
import FileUploadController from "../../../controller/FileUploadController";
import NumericController from "../../../controller/NumericController";
import ScaleController from "../../../controller/ScaleController";
import DescriptionController from "../../../controller/DescriptionController";
import ImageChoiceController from "../../../controller/ImageChoiceController";
import QuestionGroupController from "../../../controller/QuestionGroupController";
import LinkController from "../../../controller/LinkController";
import RankingController from "../../../controller/RankingController";
import PaymentController from "../../../controller/PaymentController";
import MatrisController from "../../../controller/MatrisController";
import TableController from "../../../controller/TableController";

export default function controllerList(
  setItems,
  setFinishWelcomeItems,
  finishWelcomeItems,
) {
  return [
    {
      type: "short_text",
      Component: ShortTextController,
      setItemsFn: setItems,
    },
    { type: "long_text", Component: LongTextController, setItemsFn: setItems },
    {
      type: "welcome",
      Component: WelcomeTextController,
      setItemsFn: setFinishWelcomeItems,
      items: finishWelcomeItems,
    },
    {
      type: "finish",
      Component: FinishTextController,
      setItemsFn: setFinishWelcomeItems,
      items: finishWelcomeItems,
    },
    {
      type: "multiple_choice",
      Component: MultipleChoiceController,
      setItemsFn: setItems,
    },
    { type: "dropdown", Component: DropdownController, setItemsFn: setItems },
    { type: "email", Component: EmailController, setItemsFn: setItems },
    { type: "rating", Component: RatingController, setItemsFn: setItems },
    {
      type: "file_upload",
      Component: FileUploadController,
      setItemsFn: setItems,
    },
    { type: "numeric", Component: NumericController, setItemsFn: setItems },
    { type: "scale", Component: ScaleController, setItemsFn: setItems },
    {
      type: "description",
      Component: DescriptionController,
      setItemsFn: setItems,
    },
    {
      type: "image_choice",
      Component: ImageChoiceController,
      setItemsFn: setItems,
    },
    {
      type: "question_group",
      Component: QuestionGroupController,
      setItemsFn: setItems,
    },
    { type: "link", Component: LinkController, setItemsFn: setItems },
    { type: "ranking", Component: RankingController, setItemsFn: setItems },
    { type: "payment", Component: PaymentController, setItemsFn: setItems },
    { type: "matris", Component: MatrisController, setItemsFn: setItems },
    { type: "table", Component: TableController, setItemsFn: setItems },
  ];
}
