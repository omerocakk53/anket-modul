import ShortTextController from '../../../Controller/ShortTextController';
import LongTextController from '../../../Controller/LongTextController';
import WelcomeTextController from '../../../Controller/WelcomeTextController';
import FinishTextController from '../../../Controller/FinishTextController';
import MultipleChoiceController from '../../../Controller/MultipleChoiceController';
import DropdownController from '../../../Controller/DropdownController';
import EmailController from '../../../Controller/EmailController';
import RatingController from '../../../Controller/RatingController';
import FileUploadController from '../../../Controller/FileUploadController';
import NumericController from '../../../Controller/NumericController';
import ScaleController from '../../../Controller/ScaleController';
import DescriptionController from '../../../Controller/DescriptionController';
import ImageChoiceController from '../../../Controller/ImageChoiceController';
import QuestionGroupController from '../../../Controller/QuestionGroupController';
import LinkController from '../../../Controller/LinkController';
import RankingController from '../../../Controller/RankingController';
import PaymentController from '../../../Controller/PaymentController';
import MatrisController from '../../../Controller/MatrisController';
import TableController from '../../../Controller/TableController';

export default function controllerList(setItems, setFinishWelcomeItems, finishWelcomeItems) {
    return [
        { type: "short_text", Component: ShortTextController, setItemsFn: setItems },
        { type: "long_text", Component: LongTextController, setItemsFn: setItems },
        { type: "welcome", Component: WelcomeTextController, setItemsFn: setFinishWelcomeItems, items: finishWelcomeItems },
        { type: "finish", Component: FinishTextController, setItemsFn: setFinishWelcomeItems, items: finishWelcomeItems },
        { type: "multiple_choice", Component: MultipleChoiceController, setItemsFn: setItems },
        { type: "dropdown", Component: DropdownController, setItemsFn: setItems },
        { type: "email", Component: EmailController, setItemsFn: setItems },
        { type: "rating", Component: RatingController, setItemsFn: setItems },
        { type: "file_upload", Component: FileUploadController, setItemsFn: setItems },
        { type: "numeric", Component: NumericController, setItemsFn: setItems },
        { type: "scale", Component: ScaleController, setItemsFn: setItems },
        { type: "description", Component: DescriptionController, setItemsFn: setItems },
        { type: "image_choice", Component: ImageChoiceController, setItemsFn: setItems },
        { type: "question_group", Component: QuestionGroupController, setItemsFn: setItems },
        { type: "link", Component: LinkController, setItemsFn: setItems },
        { type: "ranking", Component: RankingController, setItemsFn: setItems },
        { type: "payment", Component: PaymentController, setItemsFn: setItems },
        { type: "matris", Component: MatrisController, setItemsFn: setItems },
        { type: "table", Component: TableController, setItemsFn: setItems },
    ];
}
