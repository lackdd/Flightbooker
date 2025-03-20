import React, { useState } from "react";
import "./PeopleSelection.css"

function PeopleSelection({ selectedValue, onSelect }) {
    return (
        <div className="people-selection">
            <h2>For how many people are you buying tickets for?</h2>
            <div className="radio-group">
                <label className={`radio-option ${selectedValue === "1" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="people"
                        value="1"
                        checked={selectedValue === "1"}
                        onChange={(e) => onSelect(e.target.value)}
                    />
                    1 person
                </label>
                <label className={`radio-option ${selectedValue === "2" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="people"
                        value="2"
                        checked={selectedValue === "2"}
                        onChange={(e) => onSelect(e.target.value)}
                    />
                    2 people
                </label>
            </div>
        </div>
    );
}

export default PeopleSelection;
