import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import EquipmentTracker from "./Pages/EquipmentTracker";

import './styles/styles.css';
import './styles/toggle.css';
import './styles/buttons.css';
import './styles/modal.css';
import './styles/form.css';
import './styles/input.css';
import './styles/flyout.css';
import './styles/loadingcomponent.css';
import './styles/settingsdrawer.css';
import './styles/license.css';
import Flyout from "./components/Flyout";
import AncestryPicker from "./Pages/AncestryPicker";
import LicenseModal from "./components/Modals/LicenseModal";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isLicenseOpen, setIsLicenseOpen] = useState<boolean>(false);
  return (
    <>
      <Flyout rightLeft='right'>
        <button onClick={() => navigate("/equipment-tracker")}>Equipment Tracker</button>
        <button onClick={() => navigate("/ancestry-picker")}>Ancestry Picker</button>
        <button onClick={() => setIsLicenseOpen(true)}>Licenses</button>
      </Flyout>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<EquipmentTracker />} />

        {/* Equipment Tracker Route */}
        <Route path="/equipment-tracker" element={<EquipmentTracker />} />
        <Route path="/ancestry-picker" element={<AncestryPicker />} />

        {/* Additional Routes for Other Tools */}
        <Route path="/tool1" element={<div>Tool 1</div>} />
        <Route path="/tool2" element={<div>Tool 2</div>} />

        {/* Redirect Unknown Routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {isLicenseOpen && <div className="dim-overlay" onClick={() => setIsLicenseOpen(false)}></div>}
      <LicenseModal isLicenseModalOpen={isLicenseOpen} closeModal={() => setIsLicenseOpen(false)} />
    </>
  );
};

export default App;
