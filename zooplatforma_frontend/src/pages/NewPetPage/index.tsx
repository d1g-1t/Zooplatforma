import { NewPetEntryForm } from '../../widgets/NewPetEntryForm';
import PageLayout from '../../widgets/PageLayout';
import { formData } from '../../widgets/NewPetEntryForm/mock-data.ts';

const NewPetPage = () => {
  return (
    <PageLayout>
      <NewPetEntryForm data={formData} onAbort={() => {}} />
    </PageLayout>
  );
};

export default NewPetPage;
