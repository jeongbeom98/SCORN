import React, { useState } from 'react';

// Assuming actions is your data object
export const actions = {
    'PD-10': [
        { 
            text: 'Enhance Existing Pedestrian Facilities', 
            points: 1,
            specifics: ['Curb Extensions', 'Pedestrian Crossing Islands', 'Landscaped Buffer to an Existing Sidewalk']
        },
        { 
            text: 'Develop New Pedestrian Facilities', 
            points: 2,
            specifics: ['Pedestrian Hybrid Beacon', 'Road Diet', 'Traffic Calming Elements']
        }
    ],
    'PD-11': [
        { 
            text: 'Enhance Existing Bicycle Facilities', 
            points: 1,
            specifics: ['Improvements at Intersections', 'Driveways', 'Greater Separation between Bicyclists and Traffic']
        },
        { 
            text: 'Develop New Bicycle Facilities', 
            points: 2,
            specifics: ['Class I (separated)', 'Class II (bike lanes)', 'No Bike Lanes Shared with Cars']
        }
    ],
    'PD-13': [
        { 
            text: 'Enhance Safety for Freights', 
            points: 1,
            specifics: ['Increase Parking Spots in Rest Area', 'Add Safety Signage for Freight', 'Add Speed Warning Systems for Hills', 'Reduction of Freight-Related Noise', 'Add Automated Weigh-In-Motion', 'Virtual WIM']
        },
        { 
            text: 'Build Major Features for Freights', 
            points: 2,
            specifics: ['Build New Rest Area with Parking Spots', 'Grade and Alignment Changes', 'Grade Separation for Rail', 'Build Electric Chargers']
        },
        { 
            text: 'Build Truck Only Features', 
            points: 3,
            specifics: ['Dedicated Truck Delivery Parking Area', 'Dedicated Rail/Intermodal Facilities', 'Convert or Build Truck Only Lanes']
        }
    ],
    'PD-17': [
        { 
            text: 'Reduce Energy Consumption', 
            points: 1,
            specifics: ['Change to LED', 'Remove Traffic Signals', 'Remove Sign Lighting/Retro Reflective Signs']
        },
        { 
            text: 'Build Renewable Energy Sources', 
            points: 2,
            specifics: ['Build Solar Panels']
        }
    ],
    'PD-18': [
        { 
            text: 'Manage Plants', 
            points: 1,
            specifics: ['Remove Invasive Species', 'Plant Native and Non-Invasive Species']
        },
        { 
            text: 'Plants to Replace Structures', 
            points: 2,
            specifics: ['Plants as Snow Fences', 'Sight Screens', 'Noise Walls']
        }
    ],
    'PD-20-1': [
        { 
            text: 'Asphalt Pavement Recycling', 
            points: 1,
            specifics: ['Used in Base and Shoulders']
        },
        { 
            text: 'Asphalt Pavement Recycling', 
            points: 2,
            specifics: ['Used in Surface Layers']
        }
    ],
    'PD-20-2': [
        { 
            text: 'Concrete Pavement Recycling', 
            points: 1,
            specifics: ['Used in Base and Shoulders']
        },
        { 
            text: 'Concrete Pavement Recycling', 
            points: 2,
            specifics: ['Used in Surface Layers']
        }
    ],
    'PD-21': [
        { 
            text: 'Earthwork Balance', 
            points: 1,
            specifics: ['Balance Cut and Fill']
        }
    ],
    'PD-23': [
        { 
            text: 'Reduced Energy/Emission in Asphalt (Max 300 F)', 
            points: 1,
            specifics: []
        },
        { 
            text: 'Reduced Energy/Emission in Asphalt (Max 280 F)', 
            points: 2,
            specifics: []
        },
        { 
            text: 'Reduced Energy/Emission in Asphalt (Max 260 F)', 
            points: 3,
            specifics: []
        },
        { 
            text: 'Reduced Energy/Emission in Asphalt (Max 240 F)', 
            points: 4,
            specifics: []
        },
        { 
            text: 'Reduced Energy/Emission in Asphalt (Max 220 F)', 
            points: 5,
            specifics: []
        }
    ],
    'PD-24': [
        { 
            text: 'Permeable Pavement', 
            points: 1,
            specifics: ['Open Graded Friction Course']
        },
        { 
            text: 'Permeable Pavement', 
            points: 2,
            specifics: ['Porous Asphalt and Pervious Concrete Pavements']
        }
    ],
    'PD-33': [
        { 
            text: 'Quiet Pavements (Max 98 dBA by OBSI)', 
            points: 1,
            specifics: []
        },
        { 
            text: 'Quiet Pavements (Max 90 dBA by OBSI)', 
            points: 2,
            specifics: []
        }
    ]
};

// Hardcoded highest scores for each PD
export const highestScores = {
    'PD-10': 2,
    'PD-11': 2,
    'PD-13': 3,
    'PD-17': 2,
    'PD-18': 2,
    'PD-20-1': 2,
    'PD-20-2': 2,
    'PD-21': 1,
    'PD-23': 5,
    'PD-24': 2,
    'PD-33': 2,
    // ... add other PDs and their highest scores as needed
};

const OptionsComponent = ({ onOptionChange }) => {
    const [detailsVisibility, setDetailsVisibility] = useState({});

    // Function to toggle the visibility of the details for a given option
    const toggleDetails = (category, index) => {
        setDetailsVisibility(prevState => ({
            ...prevState,
            [`${category}-${index}`]: !prevState[`${category}-${index}`]
        }));
    };

    // Function to render the options and their details
    const renderOptions = () => {
        return Object.keys(actions).map(category => (
            <div key={category}>
                <h3>{category}</h3>
                {actions[category].map((action, index) => (
                    <div key={index}>
                        <label>
                            <input 
                                type="radio" 
                                name={category} 
                                value={action.points} 
                                onChange={() => onOptionChange(category, action.points)} 
                            />
                            {action.text} ({action.points} Points)
                        </label>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDetails(category, index);
                            }}
                            style={{ 
                                marginLeft: '5px', 
                                color: 'blue', 
                                textDecoration: 'underline',
                                fontSize: '0.8em' // Smaller font size for 'Detail'
                            }}                        >
                            {detailsVisibility[`${category}-${index}`] ? 'Hide Detail' : 'Detail'}
                        </a>
                        {detailsVisibility[`${category}-${index}`] && (
                            <ul>
                                {action.specifics.map((specific, sIndex) => (
                                    <li key={sIndex}>{specific}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
                {/* Additional "Not Applicable" option */}
                <div>
                    <label>
                        <input 
                            type="radio" 
                            name={category} 
                            value={0} 
                            onChange={() => onOptionChange(category, 0)} 
                        />
                        Not Applicable
                    </label>
                </div>
            </div>
        ));
    };

    return <div>{renderOptions()}</div>;
};

export default OptionsComponent;