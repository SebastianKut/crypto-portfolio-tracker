import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";

export default function StatusCard({ color, icon, title, amount }) {
    return (
        <div className="px-4 mb-10">
            <Card>
                <CardRow>
                    <CardHeader
                        color={color}
                        iconOnly
                        size="sm"
                        className="mb-0"
                    >
                        <Icon name={icon} size="3xl" color="white" />
                    </CardHeader>

                    <CardStatus title={title} amount={amount} />
                </CardRow>
            </Card>
        </div>
    );
}
