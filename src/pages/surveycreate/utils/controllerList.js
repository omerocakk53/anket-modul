import ShortTextController from "../../../components/survey/controller/ShortTextController";
import LongTextController from "../../../components/survey/controller/LongTextController";
import WelcomeTextController from "../../../components/survey/controller/WelcomeTextController";
import FinishTextController from "../../../components/survey/controller/FinishTextController";
import MultipleChoiceController from "../../../components/survey/controller/MultipleChoiceController";
import DropdownController from "../../../components/survey/controller/DropdownController";
import EmailController from "../../../components/survey/controller/EmailController";
import RatingController from "../../../components/survey/controller/RatingController";
import FileUploadController from "../../../components/survey/controller/FileUploadController";
import NumericController from "../../../components/survey/controller/NumericController";
import ScaleController from "../../../components/survey/controller/ScaleController";
import DescriptionController from "../../../components/survey/controller/DescriptionController";
import ImageChoiceController from "../../../components/survey/controller/ImageChoiceController";
import QuestionGroupController from "../../../components/survey/controller/QuestionGroupController";
import LinkController from "../../../components/survey/controller/LinkController";
import RankingController from "../../../components/survey/controller/RankingController";
import PaymentController from "../../../components/survey/controller/PaymentController";
import MatrisController from "../../../components/survey/controller/MatrisController";
import TableController from "../../../components/survey/controller/TableController";

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
