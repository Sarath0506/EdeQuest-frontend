import React, { useEffect, useState } from 'react';

const ChipInstructions = ({ name, label, register, errors, setValue, getValues, placeholder }) => {
    const [instructionInput, setInstructionInput] = useState('');
    const [instructions, setInstructions] = useState([]); // Initialize as an empty array
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

    useEffect(() => {
        // Set initial instructions from getValues on mount
        const initialInstructions = getValues(name) || [];
        setInstructions(initialInstructions);
    }, [getValues, name]);

    useEffect(() => {
        // Update the form field value whenever instructions change
        setValue(name, instructions, { shouldValidate: true }); // Trigger validation on update
    }, [instructions, setValue, name]);

    const handleAddInstruction = (e) => {
        e.preventDefault(); // Prevent form submission on button click or enter key
        const trimmedInstruction = instructionInput.trim();

        // Check for empty input
        if (!trimmedInstruction) {
            setError('Instruction cannot be empty');
            return;
        }

        // Check for duplicate instruction
        if (instructions.includes(trimmedInstruction)) {
            setError('This instruction already exists');
            return;
        }

        // Add the new instruction
        const newInstructions = [...instructions, trimmedInstruction];
        setInstructions(newInstructions);
        setInstructionInput(''); // Clear the input field
        setError(''); // Clear error on successful addition
    };

    const handleDelete = (instructionToDelete) => {
        const newInstructions = instructions.filter(instruction => instruction !== instructionToDelete);
        setInstructions(newInstructions);
        setError(''); // Clear error when an instruction is deleted
    };

    // Use this effect to check if there are any instructions when the form is submitted
    useEffect(() => {
        if (isSubmitted) {
            if (instructions.length === 0) {
                setError('At least one instruction is required');
            } else {
                setError(''); // Clear error if there are instructions
            }
        }
    }, [instructions, isSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Set submitted state to true
        // You can call a submit function here if needed
    };

    return (
        <div>
            <label>
                {label} <sup>*</sup>
            </label>
            <div className="flex items-center mb-2">
                <input
                    type="text"
                    value={instructionInput}
                    onChange={(e) => setInstructionInput(e.target.value)}
                    placeholder={placeholder}
                    className="border border-gray-300 rounded-md p-2 text-black flex-grow"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddInstruction(e); // Add instruction on Enter key press
                        }
                    }}
                />
                <button 
                    type="button" 
                    onClick={handleAddInstruction} 
                    className="ml-2 bg-blue-500 text-white rounded-md px-3 py-1"
                >
                    Add
                </button>
            </div>
            <div className="bg-gray-100 border border-gray-300 rounded-md max-h-40 overflow-auto p-2 mb-4">
                {instructions.length === 0 ? (
                    <p className="text-gray-500">No instructions added yet.</p>
                ) : (
                    instructions.map((instruction, index) => (
                        <div key={index} className="flex justify-between items-center text-black py-1">
                            <span>{instruction}</span>
                            <button 
                                type="button" 
                                onClick={() => handleDelete(instruction)} 
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                &times;
                            </button>
                        </div>
                    ))
                )}
            </div>
            {/* Display error messages only after form submission */}
            {isSubmitted && error && <span className='text-red-500'>{error}</span>}
            {isSubmitted && errors[name] && <span className='text-red-500'>{errors[name].message}</span>}
        </div>
    );
};

export default ChipInstructions;
