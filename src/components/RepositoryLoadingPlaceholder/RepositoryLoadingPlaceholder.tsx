import React from 'react'

interface RepositoryLoadingPlaceholderProps {
  itemCount?: number
}
/**
 * Renders a list of placeholder items for the repository list
 * @param itemCount the number of placeholder items to show 
 */
function RepositoryLoadingPlaceholder({ itemCount = 10 }: RepositoryLoadingPlaceholderProps) {
  //uses index as a key but in this case it is fine to use index since all the elements are visually equivalent
  const renderItems = () => {
    const items = []
    for (let i = 0; i < itemCount; i++) {
      items.push(<div key={i} className="block h-32 mb-4 p-6 bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"></div>)
    }
    return items;
  }

  return (
    <div className='duration-300 animate-pulse' data-testid="repositoriesLoading">
      {renderItems()}
    </div>
  )
}

export default RepositoryLoadingPlaceholder