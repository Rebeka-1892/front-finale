import { useFetchData } from "../../api-integrations/getFromApi";
function OptionKely({ip,voiture}){
    if(voiture){
        if(voiture.idoptions){
            const renderDetails = () => {
                return voiture.idoptions.map((detail, index) => (
                    <li key={index}>{useFetchData(`${ip}/options/${detail}`).nomoptions}</li>
                ));
            };
            return (
                <>
                <div className="media-content">
                            <div className="content">
                                <h3 className="has-text-info">Options</h3>
                                <ol>
                                    {renderDetails()}
                                </ol>
                            </div>
                        </div>
                </>
            );
        }
    }
return (
    <>
    
    </>
);
}
export default OptionKely