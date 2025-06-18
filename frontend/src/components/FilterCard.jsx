import { setSearchedQuery } from '@/redux/jobSlice';
import { Dialog } from '@headlessui/react'; // Modal dialog from HeadlessUI
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Kolkata"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Type",
        array: ["Internship", "Part Time", "Full Time", "Remote"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Control for modal visibility
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div>
            {/* Filter Button visible only on mobile */}
            <button
                className="bg-blue-500 text-white p-3 rounded-md md:hidden block"
                onClick={() => setIsOpen(true)} // Open modal
            >
                Open Filters
            </button>

            {/* Modal / Drawer for Mobile Filter */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-end justify-center p-4 md:hidden">
                    <Dialog.Panel className="bg-white w-full max-w-lg p-6 rounded-t-lg">
                        <h1 className='font-bold text-lg'>Filter Jobs</h1>
                        <hr className='mt-3' />
                        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                            {
                                fitlerData.map((data, index) => (
                                    <div key={index}>
                                        <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                                        {
                                            data.array.map((item, idx) => {
                                                const itemId = `id${index}-${idx}`;
                                                return (
                                                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                                                        <RadioGroupItem value={item} id={itemId} />
                                                        <Label htmlFor={itemId}>{item}</Label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                ))
                            }
                        </RadioGroup>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setIsOpen(false)} // Close modal
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Filter Section for Desktop */}
            <div className='w-full bg-white p-3 rounded-md hidden md:block'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <hr className='mt-3' />
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {
                        fitlerData.map((data, index) => (
                            <div key={index}>
                                <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div className='flex items-center space-x-2 my-2' key={itemId}>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </div>
        </div>
    );
};

export default FilterCard;
