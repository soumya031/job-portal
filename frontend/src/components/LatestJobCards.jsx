import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300 flex flex-col sm:flex-row sm:items-start sm:justify-between"
    >
      {/* Company and Location */}
      <div className="mb-4 sm:mb-0 sm:w-1/3">
        <h1 className="font-medium text-lg">
          {job?.company?.name || 'Company Name'}
        </h1>
        <p className="text-sm text-gray-500">
          {job?.location || 'Location not specified'}
        </p>
      </div>

      {/* Job Title and Description */}
      <div className="mb-4 sm:mb-0 sm:w-1/3">
        <h1 className="font-bold text-lg my-2">
          {job?.title || 'Job Title'}
        </h1>
        <p className="text-sm text-gray-600">
          {job?.description?.substring(0, 100) || 'No description available...'}
        </p>
      </div>

      {/* Badges: Position, Job Type, Salary */}
      <div className="flex flex-col sm:flex-row sm:w-1/3 items-start sm:items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position || 'N/A'} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType || 'Job Type'}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary ? `${job?.salary} LPA` : 'Salary not specified'}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
