import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_REAL_LAYOUTS_MUTATION = gql`
  mutation DeleteRealLayoutsMutation($id: Int!) {
    deleteRealLayouts(id: $id) {
      id
    }
  }
`;

const RealLayouts = ({ realLayouts }) => {
  const [deleteRealLayouts] = useMutation(DELETE_REAL_LAYOUTS_MUTATION, {
    onCompleted: () => {
      toast.success('RealLayouts deleted');
      navigate(routes.realLayoutses());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const cardRef = useRef(null);

  const openModal = (marker) => {
    setSelectedMarker(marker);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMarker(null);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalIsOpen]);

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete realLayouts ' + id + '?')) {
      deleteRealLayouts({ variables: { id } });
    }
  };

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Plot Information"
        className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto"
        overlayClassName="modal-overlay"
      >
        {selectedMarker && (
          <div ref={cardRef} className="text-black">
            <h2 className="text-2xl font-semibold mb-4">Plot Information</h2>
            <div dangerouslySetInnerHTML={{ __html: selectedMarker.note }}></div>
            <button
              onClick={closeModal}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        )}
      </ReactModal>

      <div className="rw-segment relative">
        {/* <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            RealLayouts {realLayouts.id} Detail
          </h2>
        </header> */}
        <div className="p-4">
          <h3 className="mb-2 text-2xl font-semibold">{realLayouts.name}</h3>
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center">
              <FaMapMarkerAlt color="red" size="24" />
              <span className="ml-2 text-lg">Sold</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt color="green" size="24" />
              <span className="ml-2 text-lg">Not Sold</span>
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src={realLayouts.image}
              alt={realLayouts.name}
              className="h-auto max-w-full rounded-lg"
            />
            {realLayouts.markers.map((marker, index) => {
              const left = `calc(${marker.x}% - 12px)`; // Adjust for icon size
              const top = `calc(${marker.y}% - 24px)`; // Adjust for icon size
              return (
                <div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{ left, top }}
                  onClick={() => openModal(marker)}
                >
                  <FaMapMarkerAlt color={marker.color} size="24" />
                  <span className={`font-bold text-${marker.color}-500`}>
                    {marker.number}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RealLayouts;
