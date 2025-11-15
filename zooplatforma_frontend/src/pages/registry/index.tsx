import { Table } from '../../entities/ui/Table/index';
import Button from '../../shared/ui/Button/index';
import Title from '../../shared/ui/Title/index';
import Header from '../../widgets/Header/index';
import Pagination from '../../widgets/Pagination/index';
import Sidebar from '../../widgets/Sidebar/index';
import { HEAD_COLUMNS_TITLE, MOCK_DATA } from './constants';
import s from './style.module.scss';

const Registry = () => {
  return (
    <div className={`${s.registryWrapper}`}>
      <Sidebar favoritesCount={0} favorites={[]} />
      <div className={`${s.contentWrapper}`}>
        <Header />
        <div className={`${s.title}`}>
          <Title level={2}>Реестр животных</Title>
          <div className={`${s.titleButtons}`}>
            <Button
              onClick={() => console.log('Выгрузить в Excel')}
              color="outline-blue"
            >
              Выгрузить в Excel
            </Button>
            <Button onClick={() => console.log('Добавить животное')}>
              Добавить животное
            </Button>
          </div>
        </div>
        <div className={`${s.table}`}>
          <Table
            headColumns={HEAD_COLUMNS_TITLE}
            data={MOCK_DATA}
            onOptionsClick={() => {}}
          />
        </div>
        <div className={`${s.pagination}`}>
          <Pagination numberOfPages={10} variant="simple" />
        </div>
      </div>
    </div>
  );
};

export default Registry;
