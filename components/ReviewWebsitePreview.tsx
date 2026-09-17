'use client';

import Image from 'next/image';
import { MouseEvent, useEffect, useId, useRef, useState } from 'react';

interface ReviewWebsitePreviewProps {
  companyName: string;
  imageUrl: string | null;
  websiteUrl: string | null;
}

export function ReviewWebsitePreview({
  companyName,
  imageUrl,
  websiteUrl,
}: ReviewWebsitePreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  if (!imageUrl) {
    return (
      <div className="client-review__visual">
        <span className="client-review__initial" aria-hidden="true">
          {companyName.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeDialog();
  }

  return (
    <>
      <button
        type="button"
        className="client-review__visual client-review__visual--button"
        onClick={() => setIsOpen(true)}
        aria-label={`View the complete ${companyName} website sample`}
      >
        <Image
          src={imageUrl}
          alt={`${companyName} website or project shared with their review`}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span className="client-review__view">
          View full website <span aria-hidden="true">↗</span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="website-sample-modal"
        aria-labelledby={titleId}
        onClick={closeFromBackdrop}
        onClose={() => setIsOpen(false)}
      >
        <div className="website-sample-modal__panel">
          <header className="website-sample-modal__header">
            <div>
              <span>Website sample</span>
              <h2 id={titleId}>{companyName}</h2>
            </div>
            <div className="website-sample-modal__actions">
              {websiteUrl && (
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  Visit live website <span aria-hidden="true">↗</span>
                </a>
              )}
              <button type="button" onClick={closeDialog} aria-label="Close website sample">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </header>

          <div className="website-sample-modal__viewport">
            {isOpen && (
              // The submitted image has unknown dimensions, so native sizing is
              // required to preserve the complete screenshot's true aspect ratio.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={`Complete ${companyName} website sample`}
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
