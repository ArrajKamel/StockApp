import "./Tail.css";

type Props = {
    title: string;
    subtitle: string;
};

const Tail = ({ title, subtitle }: Props) => {
    return (
        <div className="tail-container">
            <div className="tail-card">
                <div className="tail-content">
                    <div className="tail-header">
                        <h5 className="tail-title">{title}</h5>
                        <span className="tail-subtitle">{subtitle}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tail;
