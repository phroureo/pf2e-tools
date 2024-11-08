import React from 'react';

interface InformationModalProps {
    onClose: () => void;
    showLicenseModal: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({ onClose, showLicenseModal }) => {
    return (
        <div className="save-modal">
            <div className="save-modal-content">
                <h2>This site was created by phroureo</h2>
                <p>You can view the repo <a href="https://github.com/phroureo/pf2e-tools">here</a>, and submit issues if you find them.</p>
                <p>You can also reach out to phroureo directly at <a href="mailto:admin@pf2e-equipment.com">admin@pf2e-equipment.com</a>, on Discord at the <a href="https://discord.gg/wpzX2eK4sN">phroureo's PF2e Tools</a> server, or on reddit at <a href="https://www.reddit.com/message/compose/?to=phroureo&subject=PF2eTools%20Inquiry">/u/phroureo</a>.</p>
                <p>This website uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy (<a href="paizo.com/licenses/communityuse">paizo.com/licenses/communityuse</a>). We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit <a href="https://paizo.com">paizo.com</a>.</p>
                <p>For further license use info, <a href="#" onClick={showLicenseModal}>click here.</a> </p>
                <button className="confirm-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default InformationModal;
