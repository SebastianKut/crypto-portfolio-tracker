import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

export default function MessageModal({ showModal, setShowModal, message }) {
    return (
        <>
            <Modal
                size="sm"
                active={showModal}
                toggler={() => setShowModal(false)}
            >
                <ModalHeader toggler={() => setShowModal(false)}>
                    Message
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        {message}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="purple"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
