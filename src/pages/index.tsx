import { Button } from '@components/Button';
import { CreateAppModal } from '@components/CreateAppModal/CreateAppModal';
import { environment } from '@utils/enviroment';
import { useApps } from '@utils/queries/useApps';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';

const ApplicationCard: FC<{
    application: Application & { preview_url?: string };
}> = ({ application }) => {
    const [previewImage, setPreviewImage] = useState(true);

    return (
        <Link className="card p-2" to={'/app/' + application.app_id}>
            <div className="w-full flex-grow aspect-video object-cover object-top border rounded-md bg-neutral-700 flex items-center justify-center">
                {(application['preview_url'] && previewImage && (
                    <img
                        src={
                            environment.API_URL +
                            application['preview_url'] +
                            '/256'
                        }
                        alt="website preview"
                        className="w-full aspect-video object-cover object-top border rounded-md"
                        onError={() => {
                            setPreviewImage(false);
                        }}
                    />
                )) || <div className="brightness-75 font-bold">?</div>}
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-bold pb-2">{application.name}</h2>
                <p className="text-sm">
                    {application.domain_id || 'No Domain Assigned'}
                </p>
            </div>
        </Link>
    );
};

const AppsList: FC = () => {
    const { data, isLoading, isSuccess } = useApps();
    const [isCreatingApp, setCreatingApp] = useState(false);
    const [renderURLs, setRenderURLs] = useState({});

    return (
        <div className="gap-4 flex flex-col w-full">
            <div className="flex">
                <h2 className="text-2xl block flex-grow">
                    Apps {data && data.length > 0 ? `(${data.length})` : ''}
                </h2>
                <Button
                    label={'Create an App!'}
                    onClick={() => {
                        console.log('click');
                        setCreatingApp(true);
                    }}
                />
                {isCreatingApp && (
                    <CreateAppModal
                        onClose={() => {
                            setCreatingApp(false);
                        }}
                    />
                )}
            </div>
            {isLoading && <p>Loading Applications...</p>}
            {data && isSuccess && (
                <div className="flex flex-wrap gap-4 grid grid-cols-1 lg:grid-cols-3">
                    {data.map((project) => (
                        <ApplicationCard
                            key={project.app_id}
                            application={project}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Home: FC = () => {
    return (
        <div className="containerd pt-8">
            <AppsList />
        </div>
    );
};
