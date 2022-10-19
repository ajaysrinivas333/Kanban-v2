import React, { useState, useEffect, useMemo } from 'react';
import { useProjectData, useUI } from '../hooks';
import { isArrayEmpty } from '../lib';
import './ProjectSidebar.scss';

const ProjectSidebar = () => {
  const { getProjectList, projectList, projectDetails, switchProject } =
    useProjectData();
  const { showSidebar, toggleSidebar, closeSidebar, openSidebar } = useUI();
  useEffect(() => {
    getProjectList?.();
  }, []);

  const [searchItem, setSearchItem] = useState('');
  const searchHandler = (event) => {
    setSearchItem(event.target.value);
  };
  const clearFilter = () => setSearchItem('');

  const filteredList = projectList?.filter((item) =>
    item.name?.toLowerCase().includes(searchItem?.toLowerCase())
  );

  const haveNoProjects = useMemo(
    () => isArrayEmpty(projectList),
    [projectList]
  );

  useEffect(() => {
    !haveNoProjects && openSidebar();
  }, [haveNoProjects]);

  return (
    <aside
      className='project__sidebar'
      style={{ left: showSidebar ? 0 : '-215px' }}
    >
      <div className='search'>
        <div className='has-icon-right'>
          <input
            type='text'
            className='form-input'
            placeholder='Search Projects...'
            onChange={searchHandler}
            value={searchItem}
          />
          <i
            onClick={clearFilter}
            title='Clear filter'
            className='form-icon icon icon-close'
          ></i>
        </div>
        <span
          title={showSidebar ? 'Hide' : 'Show'}
          role='button'
          onClick={!haveNoProjects ? toggleSidebar : closeSidebar}
          className='material-symbols-outlined expand__collapse mt-2'
          style={{ marginLeft: !showSidebar ? '-9px' : 'auto' }}
        >
          {showSidebar ? 'arrow_back_ios' : 'arrow_forward_ios'}
        </span>
      </div>
      <div className='project__list'>
        {!isArrayEmpty(filteredList) ? (
          filteredList.map((filteredItem) => (
            <p
              className={
                showSidebar && filteredItem._id === projectDetails._id
                  ? 'active'
                  : 'inactive'
              }
              onClick={() => switchProject(filteredItem._id)}
              key={filteredItem._id}
            >
              {filteredItem.name}
            </p>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '100',
              letterSpacing: '1.22px',
              paddingTop: '50px',
            }}
          >
            <p style={{ opacity: 0.68 }}> No Projects Available... </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ProjectSidebar;