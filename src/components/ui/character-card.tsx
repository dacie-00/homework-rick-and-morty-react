export default function CharacterCard(props) {
    return (
        <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-gray-200 p-2">
            <div className="flex gap-2">
                <div className="flex flex-col justify-center gap-1">
                { props.children }
                </div>
            </div>
        </div>
    )
}