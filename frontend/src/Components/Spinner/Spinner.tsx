import './Spinner.css'
import {ClipLoader} from "react-spinners";


// ? mark means optional param, which must be initialized in the function header
type Props = {
    isLoading?: boolean
}

const Spinner = ({isLoading = true}: Props) => {
    return (
        <>
            <div id={"Loading-spinner"}>
                <ClipLoader
                    size={35}
                    color="#36d7b7"
                    loading={isLoading}
                    aria-label="Loading spinner"
                    data-testid="loader"
                />
            </div>
        </>
    );
}

export default Spinner;